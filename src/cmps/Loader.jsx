export function Loader(){
    return(
        <div 
            className="
                fixed inset-0 
                flex justify-center items-center
                bg-white/40 backdrop-blur-sm
                z-50
            "   
        >
            <img 
                className='w-[150px] animate-logoGlow'
                src="/imgs/sslogo.png" 
                alt="ss logo loader" 
            />
        </div>
    )
}