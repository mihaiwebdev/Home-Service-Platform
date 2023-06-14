

const ErrorMsg = ({message}) => {

    return (
        <div className="m-auto my-4 bg-red text-white text-center w-full h-auto p-4 rounded-md">
            <h2 className="text-xl text-white font-semibold">{message}</h2>
        </div>
    )
}

export default ErrorMsg
