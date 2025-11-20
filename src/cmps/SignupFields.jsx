export function SignupFields({ credentials, handleKeyDown, onInputChange, isLoading }){
    return(
        <div className="signup-layout">
            <div className="form-fields">
                <div className="input-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullname"
                        value={credentials.fullname}
                        onChange={onInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter full name"
                        disabled={isLoading}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={credentials.email}
                        onChange={onInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter email"
                        disabled={isLoading}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={onInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter password"
                        disabled={isLoading}
                        required
                    />
                </div>
            </div>
        </div>
    )
}