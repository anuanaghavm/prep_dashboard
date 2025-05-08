import React, { useState, useEffect } from "react";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_url";
import { Form, Button, Card } from "react-bootstrap";

const PaymentSettings = () => {
  const [settings, setSettings] = useState({
    default_currency: "INR",
    payment_gateway: "razorpay",
    auto_invoice: true,
    notification_email: "",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await allaxios.get(API_URL.PAYMENTS.GET_SETTINGS);
        console.log("Payment Settings:", response.data);
        setSettings(response.data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await allaxios.put(API_URL.PAYMENTS.UPDATE_SETTINGS, settings);
      alert("Settings updated successfully!");
    } catch (error) {
      console.error("Error updating settings:", error);
      alert("Failed to update settings");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Payment Settings</h2>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Default Currency</Form.Label>
              <Form.Select
                value={settings.default_currency}
                onChange={(e) => setSettings({...settings, default_currency: e.target.value})}
              >
                <option value="INR">Indian Rupee (INR)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Payment Gateway</Form.Label>
              <Form.Select
                value={settings.payment_gateway}
                onChange={(e) => setSettings({...settings, payment_gateway: e.target.value})}
              >
                <option value="razorpay">Razorpay</option>
                <option value="stripe">Stripe</option>
                <option value="paypal">PayPal</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Auto-generate Invoice"
                checked={settings.auto_invoice}
                onChange={(e) => setSettings({...settings, auto_invoice: e.target.checked})}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Notification Email</Form.Label>
              <Form.Control
                type="email"
                value={settings.notification_email}
                onChange={(e) => setSettings({...settings, notification_email: e.target.value})}
                placeholder="Enter email for payment notifications"
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Save Settings
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PaymentSettings; 