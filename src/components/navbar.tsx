import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { handleSignOut } from "@/app/actions/authActions";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex items-center justify-between bg-white px-4 py-3 shadow-md">
      <Link href="/" className="text-xl font-bold">
        NextJS Boilerplate
      </Link>
      {!session ? (
        <div className="flex flex-row space-x-2">
          <Link href="/login">
            <Button variant="default" size="sm">
              Log In
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="default" size="sm">
              Register
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-row space-x-2">
          {/* tampilkan hanya admin */}
          <Link href="/panel">
            <Button variant="default" size="sm">
              Panel
            </Button>
          </Link>
          <form action={handleSignOut}>
            <Button variant="default" type="submit" size="sm">
              Log Out
            </Button>
          </form>
        </div>
      )}
    </nav>
  );
}
