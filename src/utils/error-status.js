export const getNeedInstallErrorStatus = () => {
    return {
        status: (
            <span>
                <p>
                    {" "}
                    🦊{" "}
                    <a target="_blank" href={`https://metamask.io/download.html`}>
                        You must install Metamask, it is a virtual Ethereum wallet, in your
                        browser.
                    </a>
                </p>
            </span>
        ),
    }
}