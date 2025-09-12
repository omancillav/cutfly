import { auth } from "@/lib/auth-actions";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import { ProfileForm } from "@/components/ProfileForm";
import { ExportLinksButton } from "@/components/ExportLinksButton";
import { DeleteAccountButton } from "@/components/DeleteAccountButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { name, email } = session.user;

  return (
    <div className="py-4 w-full flex flex-col max-w-2xl mx-auto">
      <div className="flex flex-col gap-3 w-full">
        <Link href="/dashboard">
          <Button className="w-full" variant="outline">
            <LayoutDashboard className="w-4 h-4" />
            Go to Dashboard
          </Button>
        </Link>
        {/* Profile Header */}
        <Card className="bg-background shadow-none">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Image
                src={`https://api.dicebear.com/9.x/glass/webp?seed=${encodeURIComponent(email || name || "default")}`}
                alt="Profile"
                width={80}
                height={80}
                className="w-20 h-20 rounded-full"
              />
            </div>
            <CardTitle className="text-2xl">My Profile</CardTitle>
          </CardHeader>
        </Card>
        {/* Profile Information */}
        <Card className="bg-background shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Name Field - Editable */}
            <ProfileForm initialName={name || ""} />

            {/* Email Field - Read Only */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email || ""}
                    className="pl-10 bg-muted/50"
                    disabled
                    readOnly
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Your email is connected to GitHub and cannot be changed</p>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="bg-background shadow-none">
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Export Links Button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <ExportLinksButton />

              {/* Delete Account Button */}
              <DeleteAccountButton />
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <p>
                • <strong>Export Links:</strong> Download all your links in JSON format
              </p>
              <p>
                • <strong>Delete Account:</strong> This will permanently remove your account and all your links
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
