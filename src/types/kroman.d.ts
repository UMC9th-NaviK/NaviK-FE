// kroman 라이브러리에 대한 타입을 수동으로 정의합니다.
declare module 'kroman' {
    interface Kroman {
        parse: (text: string) => string;
        }
    
    const kroman: Kroman;
    
    export default kroman;
}