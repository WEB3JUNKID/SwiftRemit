import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Zap, Shield, TrendingUp, Users, DollarSign, Globe, Award } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full glass-effect z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Zap className="text-white text-sm" />
              </div>
              <span className="text-xl font-bold text-gray-900">SwiftRemit</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900 font-medium">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="gradient-primary text-white font-medium hover:shadow-lg transition-all">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Fast, Secure & Affordable
            <span className="gradient-text block">
              International Transfers
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Send money worldwide in minutes, not days. Join over 2 million users who trust SwiftRemit for their international money transfers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="gradient-primary text-white px-8 py-4 text-lg font-semibold hover:shadow-xl transition-all">
                <Users className="mr-2 h-5 w-5" />
                Create Account
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold hover:bg-gray-50 transition-all">
              <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Trusted by Millions Worldwide</h2>
            <p className="text-gray-600">Real numbers from real people making real transfers</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
              <div className="text-4xl font-bold gradient-text mb-2">5.2M+</div>
              <div className="text-gray-700 font-medium">Active Users</div>
              <div className="text-sm text-gray-500 mt-1">Across 195 countries</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
              <div className="text-4xl font-bold gradient-text mb-2">$127B+</div>
              <div className="text-gray-700 font-medium">Funds Transferred</div>
              <div className="text-sm text-gray-500 mt-1">Since 2019</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
              <div className="text-4xl font-bold gradient-text mb-2">195+</div>
              <div className="text-gray-700 font-medium">Countries</div>
              <div className="text-sm text-gray-500 mt-1">Send anywhere</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl">
              <div className="text-4xl font-bold gradient-text mb-2">99.97%</div>
              <div className="text-gray-700 font-medium">Success Rate</div>
              <div className="text-sm text-gray-500 mt-1">Last 12 months</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose SwiftRemit?</h2>
            <p className="text-xl text-gray-600">Experience the future of international money transfers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <Zap className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600">Send money anywhere in the world in minutes, not days. Most transfers complete within 5 minutes.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <Shield className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Bank-Level Security</h3>
              <p className="text-gray-600">Your money and data are protected with enterprise-grade encryption and multi-factor authentication.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Best Exchange Rates</h3>
              <p className="text-gray-600">Get up to 8x cheaper than traditional banks with real-time exchange rates and transparent fees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Partners */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Powered by Industry Leaders</h2>
            <p className="text-gray-600">We partner with the world's most trusted payment and technology providers</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Payment Partners */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Partners</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-blue-600 font-bold text-lg">P</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">PayPal</div>
                    <div className="text-sm text-gray-600">Digital payments & transfers</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-purple-600 font-bold text-lg">S</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Stripe</div>
                    <div className="text-sm text-gray-600">Payment processing infrastructure</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <Globe className="text-green-600 h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">SWIFT Network</div>
                    <div className="text-sm text-gray-600">Global banking infrastructure</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technology Partners */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Technology Partners</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <svg className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Apple Pay</div>
                    <div className="text-sm text-gray-600">Mobile payment technology</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-blue-600 font-bold text-lg">G</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Google Pay</div>
                    <div className="text-sm text-gray-600">Digital wallet integration</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <Shield className="text-green-600 h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Mastercard</div>
                    <div className="text-sm text-gray-600">Card network infrastructure</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-green-50 border border-green-200 rounded-full">
              <Shield className="text-green-600 h-5 w-5 mr-2" />
              <span className="text-green-800 font-medium">Bank-grade security with 256-bit SSL encryption</span>
            </div>
          </div>
        </div>
      </section>

      {/* International Compliance & Trust */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Globally Regulated & Trusted</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">Licensed and regulated by leading international financial authorities. Your money and data are protected by the highest security standards.</p>
          </div>
          
          {/* Major Regulatory Bodies */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">FCA Licensed</h3>
              <p className="text-sm text-gray-600">UK Financial Conduct Authority</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="text-green-600 h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">FinCEN MSB</h3>
              <p className="text-sm text-gray-600">US Money Services Business</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="text-purple-600 h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AUSTRAC</h3>
              <p className="text-sm text-gray-600">Australian Transaction Reports</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="text-orange-600 h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">BaFin</h3>
              <p className="text-sm text-gray-600">German Federal Financial Supervisory</p>
            </div>
          </div>

          {/* Security Certifications */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">Security & Compliance Certifications</h3>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="text-blue-600 h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">PCI DSS Level 1</div>
                  <div className="text-sm text-gray-600">Payment Card Industry</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Award className="text-green-600 h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">ISO 27001</div>
                  <div className="text-sm text-gray-600">Information Security</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Shield className="text-purple-600 h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">SOC 2 Type II</div>
                  <div className="text-sm text-gray-600">Service Organization Control</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Globe className="text-red-600 h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">GDPR Compliant</div>
                  <div className="text-sm text-gray-600">EU Data Protection</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Sending Money?</h2>
          <p className="text-xl text-blue-100 mb-8">Join millions of users who trust SwiftRemit for their international transfers</p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-blue-600 px-8 py-4 text-lg font-semibold hover:shadow-xl transition-all hover:bg-gray-50">
              <Users className="mr-2 h-5 w-5" />
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
