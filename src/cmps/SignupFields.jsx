export function SignupFields({ emailRef, credentials, onInputChange, isLoading }){
    return(
            <>
                <div className="flex flex-col gap-2">
                    <label className='font-semibold text-gray4 text-sm'>Full Name</label>
                    <input
                        ref={emailRef}
                        type="text"
                        name="fullname"
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
                        value={credentials.fullname}
                        onChange={onInputChange}
                        placeholder="Enter full name"
                        disabled={isLoading}
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className='font-semibold text-gray4 text-sm'>Email</label>
                    <input
                        type="email"
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
                        placeholder="Enter email"
                        disabled={isLoading}
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className='font-semibold text-gray4 text-sm'>Password</label>
                    <input
                        type="password"
                        name="password"
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
                        value={credentials.password}
                        onChange={onInputChange}
                        placeholder="Enter password"
                        disabled={isLoading}
                        required
                    />
                </div>
        </>
    )
}