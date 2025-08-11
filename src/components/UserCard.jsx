const UserCard = ({ user }) => {
    const { firstName, about } = user;
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src={`${import.meta.env.VITE_DUMMY_IMG_URL}`}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName}</h2>
                <p>{about}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Interested</button>
                    <button className="btn btn-secondary">Ignored</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard