export function UserLetterCircle({username = 'U'}) {
    return (
        <div className='bg-primary-dark text-white w-10 h-10 rounded-full flex items-center justify-center text-sm uppercase m-0 p-0 border-none'>
            <span>
                {username.charAt(0).toUpperCase()}
            </span>
        </div>
    )
}
