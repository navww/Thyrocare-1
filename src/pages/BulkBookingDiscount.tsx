import React from 'react';

const BulkBookingDiscount: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-black bg-opacity-50 text-white rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Bulk Booking Discount – Care for Family, Save More!</h1>
      <p className="mb-4">
        At Thyrocare, we understand that health is not just personal—it’s a family affair. That’s why we’ve introduced our Bulk Booking Discount, designed to make preventive healthcare affordable and accessible for everyone in your family.
      </p>
      <p className="mb-4">
        When you book tests for 3 or more family members together, you automatically get an additional 15% discount on your total bill. It’s our way of ensuring you save while prioritizing your loved ones’ health.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">🌟 Why Bulk Booking Matters</h2>
      <ul className="list-disc list-inside mb-4">
        <li><span className="font-bold">Family First Approach</span> – Health checkups are most effective when done regularly, and what better way than doing it together as a family.</li>
        <li><span className="font-bold">Big Savings</span> – Get flat 15% OFF in addition to any ongoing offers. More members = More savings.</li>
        <li><span className="font-bold">Hassle-Free Process</span> – Book once, pay once, and manage all reports under a single booking.</li>
        <li><span className="font-bold">Convenient Collection</span> – One-time sample collection for all family members, reducing multiple visits.</li>
        <li><span className="font-bold">Comprehensive Wellness</span> – Ensure the overall well-being of parents, spouse, and children at the same time.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">🔎 How the Bulk Booking Works</h2>
      <ol className="list-decimal list-inside mb-4">
        <li><span className="font-bold">Choose Your Tests/Packages</span> – Browse through our wide range of health packages.</li>
        <li><span className="font-bold">Add 3 or More Family Members</span> – Enter details of your family members during the booking process.</li>
        <li><span className="font-bold">Automatic Discount</span> – Once the system detects 3+ bookings, the extra 15% discount will be applied instantly at checkout.</li>
        <li><span className="font-bold">Sit Back & Relax</span> – Our team will schedule the sample collection for your family at your preferred date and time.</li>
      </ol>

      <h2 className="text-2xl font-bold mt-8 mb-4">🏆 Key Benefits at a Glance</h2>
      <ul className="list-disc list-inside mb-4">
        <li>✔ One-time payment, multiple bookings</li>
        <li>✔ Coordinated scheduling for your whole family</li>
        <li>✔ Digital reports delivered securely to your email/portal</li>
        <li>✔ Value-for-money with maximum discounts</li>
        <li>✔ Extra care with hygienic and professional sample collection</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">📌 Terms & Conditions</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Minimum of 3 family members must be included in one booking.</li>
        <li>The offer is valid on selected tests and packages.</li>
        <li>This discount can be clubbed with some ongoing promotions, but exclusions may apply.</li>
        <li>The discount is applied automatically at checkout—no coupon code required.</li>
        <li>Offer subject to change without prior notice.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">💡 Example Scenario</h2>
      <p className="mb-4">
        Imagine booking for yourself, your spouse, and your parents. Instead of booking 4 separate tests, you book together under one family booking. This not only saves you time but also gives you flat 15% extra discount.
      </p>
      <p className="mb-4">
        So instead of paying ₹10,000, you’ll pay only ₹8,500 (approx), saving ₹1,500 instantly—plus the convenience of a single appointment.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">👨‍👩‍👧‍👦 Who Can Benefit?</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Families planning annual health checkups together</li>
        <li>Parents booking for themselves and children</li>
        <li>Individuals booking tests for elderly parents + spouse</li>
        <li>Group bookings for relatives staying in the same city</li>
      </ul>
    </div>
  );
};

export default BulkBookingDiscount;
