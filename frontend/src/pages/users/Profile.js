export function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      Hello { user.name }
    </div>
  );
}