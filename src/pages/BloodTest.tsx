import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BloodTestContext } from "@/contexts/BloodTestContext";
import { CartContext } from "@/contexts/CartContext";
import { useToast } from "@/components/ui/use-toast";

const BloodTest = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { bloodTests, loading, error } = useContext(BloodTestContext);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleBookNow = (test) => {
    addToCart({
      itemId: test._id,
      name: test.name,
      price: Number(test.price),
      quantity: 1,
    });
    navigate("/cart");
  };

  const filteredTests = bloodTests
    ? bloodTests.filter(
        (test) =>
          test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          test.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Free Home Sample Pickup</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for Blood Tests (CBC, Lipid, etc)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            {filteredTests.map((test) => (
              <div
                key={test._id}
                className="flex justify-between items-center border-b py-4"
              >
                <div>
                  <p className="font-semibold">{test.name}</p>
                  <p className="text-sm text-gray-500">Rs. {test.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBookNow(test)}
                  >
                    Book Now
                  </Button>
                  {cart.items.some((item) => item.itemId === test._id) ? (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        removeFromCart(test._id);
                        toast({
                          title: "Removed from cart",
                          description: `${test.name} has been removed from your cart.`,
                        });
                      }}
                    >
                      Remove from Cart
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => {
                        addToCart({
                          itemId: test._id,
                          name: test.name,
                          price: Number(test.price),
                          quantity: 1,
                        });
                        toast({
                          title: "Added to cart",
                          description: `${test.name} has been added to your cart.`,
                        });
                      }}
                    >
                      Add to Cart
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Cart Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {cart && cart.items.length > 0 ? (
                <div>
                  {cart.items.map((item) => (
                    <div
                      key={item.itemId}
                      className="flex justify-between items-center mb-4"
                    >
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="font-semibold">
                          Rs.{item.price * item.quantity}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.itemId)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                  <hr className="my-4" />
                  <div className="flex justify-between font-bold text-lg">
                    <p>Total</p>
                    <p>Rs.{cart.totalAmount}</p>
                  </div>
                </div>
              ) : (
                <p>Cart Is Empty !!</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BloodTest;
