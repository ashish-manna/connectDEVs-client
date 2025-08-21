import { userProfile } from "../mocks/userProfile"

const Chat = () => {
    return (
        <div className="w-full">
            <div className="flex gap-2 items-center bg-base-300 py-2 px-1">
                <div className="avatar avatar-online">
                    <div className="w-10 rounded-full">
                        <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
                    </div>
                </div>
                <div>
                    <div className="text-white">{userProfile.firstName}</div>
                    <div className="text-gray-400 text-sm">Age: {userProfile.age}</div>
                </div>
            </div>
            <div className="w-full md:w-2/3 mx-auto h-screen lg:h-[75vh] flex flex-col justify-between pb-1 md:bg-base-200">
                <div>
                    <div className="chat chat-start">
                        <div className="chat-bubble chat-bubble-secondary">What kind of nonsense is this</div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-bubble chat-bubble-primary">Calm down, Anakin.</div>
                    </div>
                </div>
                <div className="w-full flex px-1 justify-between gap-0.5">
                    <input type="text" placeholder="Type here" className="input w-full" />
                    <button className="btn btn-info">Sent</button>
                </div>
            </div>
        </div>
    )
}

export default Chat