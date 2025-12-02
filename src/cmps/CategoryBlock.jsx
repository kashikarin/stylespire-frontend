export function CategoryBlock({title, field, labels, formData, updateField}){
    return(
        <article 
            className="
                flex flex-col gap-2 
                w-full
                narrow:flex-row narrow:items-start
            "
        >
            <span 
                className="
                    font-medium text-primary-dark 
                    narrow:w-1/4 
                "
            >
                {title}
            </span>
            <div className="
                    flex flex-wrap gap-2 
                    narrow:w-3/4
                "
            >
                {labels.map((label, i) => {
                    let selected
                    if (typeof formData[field] === 'string') selected = formData[field] === label
                    else selected = formData[field].includes(label)
                    return (<span 
                                key={label + i} 
                                className={`
                                    border border-primary-dark
                                    rounded-md 
                                    text-sm
                                    px-3 py-1
                                    cursor-pointer
                                    text-secondary
                                    transition 
                                    hover:bg-green-surface
                                    narrow:text-base
                                    ${selected ? 'bg-primary-dark text-surface shadow-sm' : ''}
                                `}
                                onClick={()=>updateField(field, label)}
                            >
                        {label}
                    </span>)
                })}
            </div>
        </article>
    )
}