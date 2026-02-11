import { useEffect, useState } from "react";
import { postGrowthLog, postGrowthLogRetry } from "../../apis/growth/growth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotionOauth } from "../../apis/growth/notionOAuth";
import { useSearchParams } from "react-router-dom";

const GrowthRecord = () => {
    const queryClient = useQueryClient();
    
    const [content, setContent] = useState("");

    const [notionUrl, setNotionUrl] = useState("");
    const [githubUrl, setGithubUrl] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();
    const [isNotionAuthenticated, setIsNotionAuthenticated] = useState(false);

    const hasContent = content.length > 0;
    const hasNotion = notionUrl.length > 0;
    const hasGithub = githubUrl.length > 0;

    const { mutate } = useMutation({
        mutationFn : postGrowthLog,
        onSuccess : () => {
            queryClient.invalidateQueries({ queryKey : ['growthLogs'] });

            handleCancelGrowthLog();
        },
        onError : (error) => {
            console.error("성장 기록 입력 실패:", error);
        }
    })

    useMutation({
        mutationFn: (growthLogId: number) => postGrowthLogRetry(growthLogId),
        onSuccess: (response) => {
            if (response.result.status === 'FAILED') {
                return;
            }

            queryClient.invalidateQueries({ queryKey: ['growthLogs'] });
        },
        onError: (error) => {
            console.error(error);
        }
    });
    
    const handleAddingGrowthLog = () => {
        const trimmedContent = content.trim();
        const trimmedNotion = notionUrl.trim();
        const trimmedGithub = githubUrl.trim();
    
        if (!trimmedContent && !trimmedNotion && !trimmedGithub) {
            return;
        }
    
        mutate({ content : trimmedContent || trimmedNotion || trimmedGithub });
    }
    
    const handleCancelGrowthLog = () => {
        setContent("");
        setNotionUrl("");
        setGithubUrl("");
    }

    const handleNotionAuth = async () => {
        try {
            const response = await getNotionOauth();

            if (response.isSuccess && response.result.authorizationUrl) {
                window.location.href = response.result.authorizationUrl;
            }
        }

        catch (error) {
            console.error("노션 URL을 가져오는데 실패했습니다.", error);
        }
    };

    useEffect(() => {
        const isSuccess = searchParams.get('success');
    
        if (isSuccess === 'true') {
            setIsNotionAuthenticated(true);

            localStorage.setItem('isNotionAuthenticated', 'true');
            
            searchParams.delete('success');
            setSearchParams(searchParams);
            
            console.log("노션 연동이 완료되었습니다!");
        }
    
        if (localStorage.getItem('isNotionAuthenticated') === 'true') {
            setIsNotionAuthenticated(true);
        }

    }, [searchParams, setSearchParams]);

    return (
        <div className='flex flex-col bg-white rounded-[16px] p-[16px] gap-[10px] border border-[1px] border-primary-blue-500'>
            <div className='flex flex-col gap-[16px]'>
                <p className='text-heading-20B text-base-800'> 성장 기록하기 </p>

                <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={hasNotion || hasGithub}
                className={`h-[145px] rounded-[8px] border-[1px] border-primary-blue-100 p-[16px] gap-[10px] text-body-14M text-[#11111133] resize-none focus:outline-none
                            ${(hasNotion || hasGithub) ? "border-base-300 bg-[#E3E3E34D]" : "" }`}
                placeholder="새로 추가된 나의 경험과 커리어, 핵심 역량을 위주로 성장 타임라인을 채워보세요!"
                />

                <div className="flex flex-col gap-[12px]">
                    <div className="flex flex-col gap-[16px]">
                        <div className="flex flex-1 justify-between">
                            <div className="flex flex-1 w-[73px] gap-[8px]">
                                <img 
                                src="/icons/growth/material-symbols_add-link-rounded.svg"
                                alt="링크"
                                className="w-[20px] h-[20px]"
                                />
                                <p className="text-body-14M text-[#111111CC]"> Notion </p>
                            </div>

                            <button 
                            onClick={handleNotionAuth}
                            disabled={isNotionAuthenticated || hasContent || hasGithub}
                            className={`flex items-center px-[8px] py-[4px] rounded-[4px] border border-[1px] border-base-200
                            ${isNotionAuthenticated ? "bg-primary-blue-100 text-primary-blue-900" : ""}`}>
                                <p className="text-caption-12M text-center"> 
                                    {isNotionAuthenticated ? "Notion 인증 완료" : "Notion 인증하기"}
                                </p>
                            </button>
                        </div>

                        <input 
                        type="text"
                        value={notionUrl}
                        onChange={(e) => setNotionUrl(e.target.value)}
                        disabled={!isNotionAuthenticated || hasContent || hasGithub}
                        className={`flex w-full h-[33px] items-center border-[1px] border-base-300 px-[12px] py-[8px] rounded-[8px] text-caption-12M focus:outline-none transition-all
                            ${notionUrl ? "text-[#4E83F9CC] underline" : "text-base-800 placeholder:text-[#11111133]"}
                            ${(!isNotionAuthenticated || hasContent || hasGithub) ? "border-base-300 bg-[#E3E3E34D]" : "" }`}
                        placeholder="URL"
                        />
                    </div>

                    <div className="flex flex-col gap-[16px]">
                        <div className="flex w-[73px] gap-[8px]">
                            <img 
                            src="/icons/growth/material-symbols_add-link-rounded.svg"
                            alt="링크"
                            className="w-[20px] h-[20px]"
                            />
                            <p className="text-body-14M text-[#111111CC]"> GitHub </p>
                        </div>

                        <input 
                        type="text"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        disabled={hasContent || hasNotion}
                        className={`flex w-full h-[33px] items-center border-[1px] border-base-300 px-[12px] py-[8px] rounded-[8px] text-caption-12M focus:outline-none transition-all
                            ${githubUrl ? "text-[#4E83F9CC] underline" : "text-base-800 placeholder:text-[#11111133]"}
                            ${(hasContent || hasNotion) ? "border-base-300 bg-[#E3E3E34D]" : "" }`}
                        placeholder="URL"
                        />
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-center gap-[16px]">
                    <button className="flex items-center justify-center w-full h-[48px] py-[12px] rounded-[8px] gap-[10px] bg-base-200">
                        <p className="text-body-16B text-base-600 text-center"> 취소 </p>
                    </button>

                    <button 
                    onClick={handleAddingGrowthLog}
                    className="flex items-center justify-center w-full h-[48px] py-[12px] rounded-[8px] gap-[10px] bg-primary-blue-500">
                        <p className="text-body-16B text-base-100 text-center"> 작성 완료 </p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GrowthRecord
