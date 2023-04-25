import NavButton from './NavButton'

export const Root = () => {
    return (
        <div>
            <h1>Landing Page</h1>

            <NavButton path="/signup" text="Sign Up" />
            <NavButton path="/login" text="Log In" />

        </div>
    )
}

export const NotFound = () => {
    return (
        <>
            <NavButton />
            <br />
            <h1>404 Not Found</h1>
        </>
    )

}