function user() {
  return (
    <div className="d-flex align-items-center">
      <div className="post-list">
        {[1, 2, 3, 4, 5, 6].map((x, index) => (
          <p key={index}>Post {x}</p>
        ))}
      </div>
      <div className="user-info">your info babe</div>
    </div>
  );
}
export default user;
