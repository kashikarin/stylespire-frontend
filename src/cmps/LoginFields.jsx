export function LoginFields({ credentials, isLoading, handleKeyDown, onInputChange }){
    return(
        <>
            <div className="flex flex-col gap-2">
                <label className='font-semibold text-gray4 text-sm'>Email</label>
                <input
                    type="text"
                    name="email"
                    className='
                        py-3 px-4
                        border-2 border-border
                        rounded-lg
                        text-sm
                        transition-border duration-300 ease-linear
                        text-left
                        placeholder::text-gray7
                        focus:outline-none focus:shadow-[0_0_0_3px rgba(0, 123, 255, 0.1)]
                    '
                    value={credentials.email}
                    onChange={onInputChange}
                    onKeyDown={handleKeyDown}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(ev) => ev.stopPropagation()}
                    placeholder="Enter email or username"
                    disabled={isLoading}
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className='font-semibold text-gray4 text-sm'>Password</label>
                <input
                    type="password"
                    name="password"
                    className="
                        py-3 px-4
                        border-2 border-border
                        rounded-lg
                        text-sm
                        transition-border duration-300 ease-linear
                        text-left
                        placeholder::text-gray7
                        focus:outline-none focus:shadow-[0_0_0_3px rgba(0, 123, 255, 0.1)] 
                    "
                    value={credentials.password}
                    onChange={onInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter password"
                    disabled={isLoading}
                    required
                />
            </div>
        </>
    )
}
