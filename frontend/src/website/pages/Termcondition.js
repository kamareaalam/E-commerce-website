import React from 'react'

const Termcondition = () => {
  return (
    <div className="container p-3">
      <div className="rounded shadow-lg border">
        <div className='body'>
          <div className='card-body'>
          <h2 className="text-center mb-4">Terms and Conditions</h2>
              <h4 className='mt-4' style={{margin: '10px'}}>1. Introduction</h4>
            <p style={{ margin: '10px' }}>
                Welcome to our eCommerce website. By accessing or using our website, you agree to be bound by these Terms and Conditions.
              </p>

            <h4 className='mt-4' style={{ margin: '10px' }}>2. Use of the Website</h4>
              <ul className="mb-4" style={{ listStyleType: 'disc' }}>
                <li>You must be at least 18 years old to use this website.</li>
                <li>You agree not to use the website for any illegal or unauthorized purpose.</li>
                <li>All content on this site is for personal use only.</li>
              </ul>

            <h4 className='mt-4' style={{ margin: '10px' }}>3. Product Information</h4>
              <p style={{ margin: '10px' }}>
                We make every effort to ensure that the product descriptions and images are accurate. However, we do not guarantee that all details are error-free.
              </p>

            <h4 className='mt-4' style={{ margin: '10px' }}>4. Payment and Pricing</h4>
              <ul className="mb-4" style={{ listStyleType: 'disc' }}>
                <li>All prices are listed in INR and are inclusive of taxes unless specified.</li>
                <li>We reserve the right to modify prices at any time without prior notice.</li>
              </ul>

            <h4 className='mt-4' style={{ margin: '10px' }}>5. Shipping and Delivery</h4>
              <p style={{ margin: '10px' }}>
                We aim to deliver products within the estimated timeframe, but we are not responsible for delays caused by unforeseen circumstances.
              </p>

            <h4 className='mt-4' style={{ margin: '10px' }}>6. Returns and Refunds</h4>
              <ul className="mb-4" style={{ listStyleType: 'disc' }}>
                <li>Returns are accepted within 7 days of delivery.</li>
                <li>Refunds will be processed within 5-7 business days.</li>
              </ul>

            <h4 className='mt-4' style={{ margin: '10px' }}>7. Privacy Policy</h4>
              <p style={{ margin: '10px' }}>
                Your personal information is protected under our Privacy Policy. By using our website, you consent to our data practices.
              </p>

            <h4 className='mt-4' style={{ margin: '10px' }}>8. Changes to Terms</h4>
              <p style={{ margin: '10px' }}>
                We reserve the right to update or modify these Terms at any time. Continued use of the website constitutes acceptance of the revised terms.
              </p>

            <h4 className='mt-4' style={{ margin: '10px' }}>9. Contact Information</h4>
              <p style={{ margin: '10px' }}>
                If you have any questions, feel free to contact us at <a href="mailto:support@ecommerce.com">support@ecommerce.com</a>.
              </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Termcondition
