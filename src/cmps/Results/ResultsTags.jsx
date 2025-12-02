import { buildGlowyTags } from "../../util/styleTagUtils"

export function ResultsTags({ formData }){
    const tags = buildGlowyTags(formData)

    return(
        <div className="flex flex-wrap gap-2 my-4">
            {tags.map(tag => (
                <span 
                    key={tag} 
                    className="
                        rounded-full 
                        text-[13px] font-medium
                        text-primary-dark 
                        bg-[#40707610] 
                        border border-[#40707640]
                        backdrop-blur-[2px]
                        shadow-[0_0_6px_#40707640]
                        py-1 px-2
                    "
                >
                    {tag}
                </span>
            ))}
        </div>
    )
}