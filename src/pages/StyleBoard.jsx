export function StyleBoard(){
    return(
        <div 
            className="
                style-board-container 
                w-full 
                flex flex-col flex-1
                overflow-hidden
                narrow:flex-row
            "
        >
            <main 
                className="
                    flex-1
                    relative
                    overflow-hidden
                    bg-primary-bg
                    order-1
                    h-[60dvh]
                    narrow:order-none
                    narrow:h-auto
                "
            >

            </main>
            <aside 
                className="
                    w-full h-[40dvh]
                    shrink-0
                    overflow-y-auto
                    border-t border-primary-dark
                    p-4 
                    bg-primary-bg
                    order-2
                    narrow:w-[260px] 
                    narrow:border-t-0 narrow:border-l narrow:border-primary-dark
                    narrow:h-auto
                    narrow:order-none
                ">

            </aside>
        </div>
    )
}