

const PopMessage = ({children, setShowPopMessage}) => {
    return (
       
            <div className="min-w-screen min-h-screen z-50 absolute top-0 min-w-[100%] left-0" 
            onClick={()=>setShowPopMessage(()=>false)}
            >
                <div 
                className="transition-all duration-300 ease-in-out absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 border-brand-400/80 border-[0.05px] bg-gray-light rounded-lg  shadow-lg text-white z-50"
                onClick={(e)=>e.stopPropagation()}
                >
                
                {children}
            </div>
            </div>
        
    )
}

export default PopMessage;