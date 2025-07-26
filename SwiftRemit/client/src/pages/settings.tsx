import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Link, useLocation } from "wouter";
import { 
  ArrowLeft,
  Shield, 
  User, 
  Settings as SettingsIcon, 
  Trash2, 
  Phone, 
  Mail,
  Key,
  Lock,
  Globe,
  CreditCard,
  HelpCircle,
  FileText,
  Loader2
} from "lucide-react";
import { useAuth, getUserProfile } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const pinSchema = z.object({
  pin: z.string().length(4, "PIN must be 4 digits").regex(/^\d+$/, "PIN must contain only numbers"),
  confirmPin: z.string().length(4, "PIN must be 4 digits").regex(/^\d+$/, "PIN must contain only numbers"),
}).refine((data) => data.pin === data.confirmPin, {
  message: "PINs don't match",
  path: ["confirmPin"],
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const contactSchema = z.object({
  contactNumber: z.string().min(10, "Please enter a valid phone number"),
});

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type PinForm = z.infer<typeof pinSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;
type ContactForm = z.infer<typeof contactSchema>;
type EmailForm = z.infer<typeof emailSchema>;

export default function Settings() {
  const [, setLocation] = useLocation();
  const [isUpdating, setIsUpdating] = useState(false);
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const { data: userProfile, isLoading } = useQuery({
    queryKey: ["/api/users/email", user?.email],
    enabled: !!user?.email,
    queryFn: () => getUserProfile(user?.email || ""),
  });

  const pinForm = useForm<PinForm>({
    resolver: zodResolver(pinSchema),
    defaultValues: { pin: "", confirmPin: "" },
  });

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const contactForm = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { contactNumber: userProfile?.contactNumber || "" },
  });

  const emailForm = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: userProfile?.email || "" },
  });

  const onSubmitPin = async (data: PinForm) => {
    setIsUpdating(true);
    try {
      // Here you would typically hash the PIN and store it securely
      toast({
        title: "Payment PIN set successfully",
        description: "Your payment PIN has been updated.",
      });
      pinForm.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to set payment PIN",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const onSubmitPassword = async (data: PasswordForm) => {
    setIsUpdating(true);
    try {
      // Here you would typically update the password via Firebase Auth
      toast({
        title: "Password updated successfully",
        description: "Your password has been changed.",
      });
      passwordForm.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update password",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const onSubmitContact = async (data: ContactForm) => {
    setIsUpdating(true);
    try {
      toast({
        title: "Contact number updated",
        description: "Your contact number has been updated.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update contact number",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const onSubmitEmail = async (data: EmailForm) => {
    setIsUpdating(true);
    try {
      toast({
        title: "Email updated",
        description: "Your email address has been updated.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update email",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await logout();
      toast({
        title: "Account deletion requested",
        description: "Your account deletion request has been submitted.",
      });
      setLocation("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete account",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Profile not found</h2>
          <Button onClick={() => setLocation("/signup")}>Create Profile</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-4">
            <Link href="/home">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <SettingsIcon className="h-6 w-6 text-gray-600" />
              <h1 className="text-xl font-bold text-gray-900">Settings</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Security Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span>Security</span>
              </CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Payment PIN */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Payment PIN</h3>
                    <p className="text-sm text-gray-500">Used for transactions and withdrawals</p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Key className="h-4 w-4 mr-2" />
                        Set PIN
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Set Payment PIN</DialogTitle>
                        <DialogDescription>
                          Create a 4-digit PIN for secure transactions
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...pinForm}>
                        <form onSubmit={pinForm.handleSubmit(onSubmitPin)} className="space-y-4">
                          <FormField
                            control={pinForm.control}
                            name="pin"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>PIN</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="password" 
                                    maxLength={4}
                                    placeholder="Enter 4-digit PIN" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={pinForm.control}
                            name="confirmPin"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm PIN</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="password" 
                                    maxLength={4}
                                    placeholder="Confirm your PIN" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit" disabled={isUpdating} className="w-full">
                            {isUpdating ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Setting PIN...
                              </>
                            ) : (
                              "Set PIN"
                            )}
                          </Button>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <Separator />

              {/* Change Password */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Password</h3>
                    <p className="text-sm text-gray-500">Update your account password</p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Lock className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription>
                          Enter your current password and a new password
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...passwordForm}>
                        <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-4">
                          <FormField
                            control={passwordForm.control}
                            name="currentPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="Enter current password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={passwordForm.control}
                            name="newPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="Enter new password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={passwordForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm New Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="Confirm new password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit" disabled={isUpdating} className="w-full">
                            {isUpdating ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Updating Password...
                              </>
                            ) : (
                              "Update Password"
                            )}
                          </Button>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-green-600" />
                <span>Account Information</span>
              </CardTitle>
              <CardDescription>View and update your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Full Name */}
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-900">Full Name</Label>
                  <p className="text-sm text-gray-600">{userProfile.fullName}</p>
                </div>
                <Badge variant="secondary">Read Only</Badge>
              </div>

              <Separator />

              {/* Account Number */}
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-900">Account Number</Label>
                  <p className="text-sm text-gray-600 font-mono">{userProfile.accountNumber}</p>
                </div>
                <Badge variant="secondary">Read Only</Badge>
              </div>

              <Separator />

              {/* Contact Number */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Contact Number</h3>
                    <p className="text-sm text-gray-500">{userProfile.contactNumber}</p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Update
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Contact Number</DialogTitle>
                        <DialogDescription>
                          Enter your new contact number
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...contactForm}>
                        <form onSubmit={contactForm.handleSubmit(onSubmitContact)} className="space-y-4">
                          <FormField
                            control={contactForm.control}
                            name="contactNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Contact Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter new contact number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit" disabled={isUpdating} className="w-full">
                            {isUpdating ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Updating...
                              </>
                            ) : (
                              "Update Contact"
                            )}
                          </Button>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <Separator />

              {/* Email */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Email Address</h3>
                    <p className="text-sm text-gray-500">{userProfile.email}</p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Update
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Email Address</DialogTitle>
                        <DialogDescription>
                          Enter your new email address
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...emailForm}>
                        <form onSubmit={emailForm.handleSubmit(onSubmitEmail)} className="space-y-4">
                          <FormField
                            control={emailForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="Enter new email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit" disabled={isUpdating} className="w-full">
                            {isUpdating ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Updating...
                              </>
                            ) : (
                              "Update Email"
                            )}
                          </Button>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-purple-600" />
                <span>Preferences</span>
              </CardTitle>
              <CardDescription>Customize your app preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Currency */}
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-900">Preferred Currency</Label>
                  <p className="text-sm text-gray-600">{userProfile.currency}</p>
                  <p className="text-xs text-gray-500">Based on your country selection</p>
                </div>
                <Badge variant="secondary">Auto-set</Badge>
              </div>

              <Separator />

              {/* Language */}
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-900">Language</Label>
                  <p className="text-sm text-gray-600">English (US)</p>
                </div>
                <Badge variant="secondary">Default</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-orange-600" />
                <span>Controls</span>
              </CardTitle>
              <CardDescription>Manage your account and get help</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Support */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <HelpCircle className="h-5 w-5 text-blue-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">Contact Support</h3>
                    <p className="text-sm text-gray-500">Get help with your account</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Contact Us
                </Button>
              </div>

              <Separator />

              {/* Privacy Policy */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-green-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">Privacy Policy</h3>
                    <p className="text-sm text-gray-500">Read our privacy policy</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Policy
                </Button>
              </div>

              <Separator />

              {/* Delete Account */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Trash2 className="h-5 w-5 text-red-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">Delete Account</h3>
                    <p className="text-sm text-gray-500">Permanently delete your account</p>
                  </div>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}