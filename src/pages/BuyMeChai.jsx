const BuyMeChai = () => {
    return (
        <div className="w-full md:flex md:justify-center px-5">
            <div className="card w-full md:w-96 bg-base-100 shadow-md border">
                <div className="card-body">
                    <span className="badge badge-xs badge-warning">Just a little gesture</span>
                    <div className="flex justify-between items-center mt-2">
                        <h2 className="text-2xl font-bold">☕ Buy me a Chai!</h2>
                        <span className="text-xl font-semibold">₹25</span>
                    </div>
                    <p className="mt-3 text-sm text-gray-600">
                        This is <span className="font-semibold">not a real payment</span>.
                        No money will be deducted. It’s just a small gesture
                        to appreciate the developer. 🙌
                    </p>
                    <ul className="mt-4 flex flex-col gap-2 text-sm">
                        <li className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Support the dev with positive vibes
                        </li>
                        <li className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Test Stripe payment flow safely
                        </li>
                        <li className="flex items-center opacity-70">
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            No actual money involved 🚫
                        </li>
                    </ul>
                    <div className="mt-3 p-3 bg-green-100 border border-yellow-200 rounded-lg text-sm text-yellow-700">
                        Note: ✅ You can use <span className="font-semibold">any fake/test card number</span>
                        (like <code>4242 4242 4242 4242</code>) to try payment.
                        It will work in Stripe test mode.
                    </div>
                    <div className="mt-6">
                        <button className="btn btn-primary btn-block">
                            Support with ₹25
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BuyMeChai