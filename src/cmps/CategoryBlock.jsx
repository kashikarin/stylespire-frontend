export function CategoryBlock({title, field, labels, formData, updateField}){
    return(
        <article className="flex items-center w-full">
            <span className="font-medium font-x w-1/4 self-start border-b-primary-dark">{title}</span>
            <div className="flex flex-wrap gap-2 w-3/4">
                {labels.map((label, i) => {
                    let selected
                    if (typeof formData[field] === 'string') selected = formData[field] === label
                    else selected = formData[field].includes(label)
                    return (<span 
                                key={label + i} 
                                className={`
                                    border border-primary-dark
                                    rounded-md 
                                    px-3
                                    cursor-pointer
                                    text-secondary
                                    transition 
                                    hover:bg-green-surface
                                    ${selected ? 'bg-primary-dark text-surface' : ''}
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