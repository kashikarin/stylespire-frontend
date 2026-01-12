import { buildGlowyTags } from "../../util/styleTagUtils"

export function ResultsTags({ formData }){
    const tags = buildGlowyTags(formData)

    return(
        <div className="flex flex-wrap gap-2 my-2 narrow:my-4">
            {tags.map(tag => (
                <span 
                    key={tag} 
                    className="
                        rounded-full
                        text-xs font-medium
                        text-primary-dark/80
                        bg-primary-dark/5
                        border border-primary-dark/10
                        px-3 py-1
                        tracking-wide
                    "
                >
                    {tag}
                </span>
            ))}
        </div>
    )
}