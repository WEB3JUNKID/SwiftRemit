import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link, useLocation } from "wouter";
import { 
  Plus, 
  Send, 
  Download, 
  Wallet, 
  Settings, 
  Eye, 
  EyeOff,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Receipt
} from "lucide-react";
import { useAuth, getUserProfile } from "@/lib/firebase";

const currencySymbols: Record<string, string> = {
  USD: "$", EUR: "€", GBP: "£", NGN: "₦", INR: "₹", CAD: "C$", AUD: "A$",
  JPY: "¥", CNY: "¥", KRW: "₩", THB: "฿", SGD: "S$", MYR: "RM", PHP: "₱",
  IDR: "Rp", VND: "₫", PKR: "₨", BDT: "৳", LKR: "₨", NPR: "₨", AFN: "؋",
  ALL: "L", DZD: "دج", AOA: "Kz", ARS: "$", AMD: "֏", AWG: "ƒ", AZN: "₼",
  BSD: "$", BHD: ".د.ب", BBD: "$", BYN: "Br", BZD: "BZ$", XOF: "CFA",
  BMD: "$", BTN: "Nu.", BOB: "Bs", BAM: "KM", BWP: "P", BRL: "R$", BND: "$",
  BGN: "лв", BIF: "FBu", CVE: "$", KHR: "៛", XAF: "FCFA", CLP: "$", COP: "$",
  KMF: "CF", CDF: "FC", CRC: "₡", HRK: "kn", CUP: "₱", CZK: "Kč", DKK: "kr",
  DJF: "Fdj", DOP: "RD$", XCD: "$", EGP: "£", ERN: "Nfk", ETB: "Br", FJD: "$",
  GMD: "D", GEL: "₾", GHS: "₵", GIP: "£", GTQ: "Q", GNF: "FG", GYD: "$",
  HTG: "G", HNL: "L", HKD: "$", HUF: "Ft", ISK: "kr", IQD: "ع.د", IRR: "﷼",
  ILS: "₪", JMD: "J$", JOD: "JD", KZT: "₸", KES: "KSh", KWD: "KD", KGS: "лв",
  LAK: "₭", LBP: "£", LSL: "M", LRD: "$", LYD: "LD", MKD: "ден", MGA: "Ar",
  MWK: "MK", MXN: "$", MDL: "lei", MNT: "₮", MAD: "MAD", MZN: "MT", MMK: "K",
  NAD: "$", NZD: "$", NIO: "C$", XPF: "₣", NOK: "kr", OMR: "﷼", PYG: "Gs",
  PEN: "S/", PLN: "zł", QAR: "﷼", RON: "lei", RUB: "₽", RWF: "R₣", WST: "WS$",
  STN: "Db", SAR: "﷼", RSD: "Дин.", SCR: "₨", SLE: "Le", SOS: "S", ZAR: "R",
  SSP: "£", SDG: "ج.س.", SRD: "$", SZL: "E", SEK: "kr", CHF: "CHF", SYP: "£",
  TWD: "NT$", TJS: "SM", TZS: "TSh", TOP: "T$", TTD: "TT$", TND: "د.ت",
  TRY: "₺", TMT: "T", UGX: "USh", UAH: "₴", UYU: "$U", UZS: "лв", VUV: "VT",
  VES: "Bs", YER: "﷼", ZMW: "ZK", ZWL: "Z$"
};

export default function Home() {
  const [, setLocation] = useLocation();
  const [balanceVisible, setBalanceVisible] = useState(true);
  const { user, loading, logout } = useAuth();

  const { data: userProfile, isLoading: profileLoading } = useQuery({
    queryKey: ["/api/users/email", user?.email],
    enabled: !!user?.email,
    queryFn: () => getUserProfile(user?.email || ""),
  });

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  if (loading || profileLoading) {
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

  const currencySymbol = currencySymbols[userProfile?.currency || "USD"] || userProfile?.currency || "USD";
  const userInitials = userProfile?.fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">SwiftRemit</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/settings">
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-blue-500 text-white text-xl font-semibold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Hi, {userProfile?.fullName.split(' ')[0]}!
              </h1>
              <p className="text-gray-600">Welcome back to SwiftRemit</p>
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white/90 font-medium">Available Balance</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setBalanceVisible(!balanceVisible)}
                className="text-white/90 hover:text-white hover:bg-white/20"
              >
                {balanceVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold">
                {balanceVisible 
                  ? `${currencySymbol}${userProfile?.balance?.toLocaleString() || "0"}` 
                  : "••••••"
                }
              </span>
              <span className="text-white/80 text-sm font-medium">{userProfile?.currency}</span>
            </div>
            <div className="flex items-center space-x-4 mt-3 text-sm text-white/80">
              <span>Account: {userProfile?.accountNumber}</span>
              <span>•</span>
              <span>{userProfile?.country}</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="cursor-pointer hover:shadow-md transition-shadow group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Plus className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Add Money</h3>
              <p className="text-sm text-gray-500">Top up your account</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Send className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Transfer</h3>
              <p className="text-sm text-gray-500">Send money abroad</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <Download className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Withdraw</h3>
              <p className="text-sm text-gray-500">Cash out funds</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <Wallet className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Receive</h3>
              <p className="text-sm text-gray-500">Get money from others</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Receipt className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Your latest transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-gray-500">
              <Wallet className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="font-medium">No recent activity</p>
              <p className="text-sm">Start by adding money or making your first transfer</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}