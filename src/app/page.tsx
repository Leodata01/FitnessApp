import {
  SignedIn,
  SignOutButton,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";

const HomePage = () => {
  return (
    <div className="flex items-center justify-center">
      home page
      <SignedIn>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
};

export default HomePage;
