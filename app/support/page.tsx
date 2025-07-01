import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Phone, Clock } from "lucide-react"

export default function SupportPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Customer Support</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Common Questions</h2>
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="font-medium mb-2">Where is my order?</h3>
              <p className="text-sm mb-3">
                Check your order status by logging into your account or using the tracking number sent to your email.
              </p>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-medium mb-2">Returns & Exchanges</h3>
              <p className="text-sm mb-3">
                We accept returns within 30 days of purchase. Items must be unworn and in original packaging.
              </p>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-medium mb-2">Sizing Assistance</h3>
              <p className="text-sm mb-3">
                Use our size guide or contact us for personalized sizing recommendations.
              </p>
            </Card>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <h3 className="font-medium mb-1">Email Support</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    Get in touch via email for detailed assistance
                  </p>
                  <p className="text-sm font-medium">support@pico-shoes.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <h3 className="font-medium mb-1">Phone Support</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    Speak directly with our support team
                  </p>
                  <p className="text-sm font-medium">(555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <h3 className="font-medium mb-1">Business Hours</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    We're here to help during these hours
                  </p>
                  <p className="text-sm font-medium">Mon-Fri, 9am-5pm ET</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">How Our Support Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold mb-2">1</div>
            <h3 className="font-medium mb-2">Contact Us</h3>
            <p className="text-sm">
              Reach out via email or phone using the contact information above.
            </p>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold mb-2">2</div>
            <h3 className="font-medium mb-2">Get Expert Help</h3>
            <p className="text-sm">
              Our knowledgeable support team will assist you with your inquiry.
            </p>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold mb-2">3</div>
            <h3 className="font-medium mb-2">Quick Resolution</h3>
            <p className="text-sm">
              We aim to resolve all inquiries promptly and professionally.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
} 