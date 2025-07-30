import LoginForm from "./component/loginForm";


export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100">
      <main className="flex flex-col items-center gap-8">
        <LoginForm />
      </main>
    </div>
  );
}