const MySuccess: React.FC = async ({  }) => {
//   const resolvedParams = await params;
//   const trans_id = resolvedParams.trans_id;
  const trans_id = 12;
  return (
    <div>
      {trans_id ? (
        <div>
          <h1>Checkout Successful!</h1>
          <p>
            Thank you for your purchase. Your order has been processed
            successfully.
          </p>
        </div>
      ) : (
        <div>
          <div>Invalid Transaction ID and please reload the page</div>
        </div>
      )}
    </div>
  );
};

export default MySuccess;
