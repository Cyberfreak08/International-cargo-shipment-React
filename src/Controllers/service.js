import axios from 'axios';

// Load data from JSON file
export const loadData = async () => {
  try {
    const response = await axios.get('/src/utils/data.json');
    return response.data;
  } catch (error) {
    console.error('Error loading data:', error);
    return null;
  }
};

// Get customer details by ID
export const getCustomerDetailsById = (data, customerId) => {
  return data.customers.find(customer => customer.id === customerId);
};

// Get customers by category in Q2
export const getCustomersByCategoryInQ2 = (data) => {
  const result = [];

  // Filter transactions for Q2 (April to June)
  const filteredData = data.transactions.filter(transaction => {
    const date = new Date(transaction.date_of_transaction);
    const month = date.getMonth() + 1; // getMonth() is zero-based
    return month >= 4 && month <= 6; // Q2 is April, May, June
  });

  data.categories.forEach(category => {
    const categoryData = filteredData.filter(
      transaction => transaction.category_id === category.id
    );

    const branches = Array.from(
      new Set(categoryData.map(item => item.office_id))
    );

    branches.forEach(branch => {
      const branchData = categoryData.filter(
        transaction => transaction.office_id === branch
      );

      // Calculate total revenue for each customer in the branch and category
      const customerRevenue = {};
      branchData.forEach(transaction => {
        if (!customerRevenue[transaction.customer_id]) {
          customerRevenue[transaction.customer_id] = 0;
        }
        customerRevenue[transaction.customer_id] += transaction.amount;
      });

      // Find the customer(s) with the maximum revenue
      const maxRevenue = Math.max(...Object.values(customerRevenue));
      const maxRevenueCustomers = Object.keys(customerRevenue).filter(
        customerId => customerRevenue[customerId] === maxRevenue
      );

      maxRevenueCustomers.forEach(customerId => {
        const customer = getCustomerDetailsById(data, customerId);
        result.push({
          branch: branch,
          category: category, // Include the entire category object
          customer: {
            id: customer.id,
            name: customer.name,
            company_name: customer.company_name,
            totalRevenue: customerRevenue[customerId],
          },
        });
      });
    });
  });

  return result;
};

// Get customers by category for a specific quarter
export const getCustomersByCategory = (data, categoryId, quarter) => {
  const startMonth = (quarter - 1) * 3 + 1;
  const endMonth = startMonth + 2;
  const startDate = new Date(`2024-${startMonth}-01`);
  const endDate = new Date(`2024-${endMonth}-01`);
  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(endDate.getDate() - 1);

  const customers = data.transactions
    .filter(transaction => {
      const date = new Date(transaction.date_of_transaction);
      return (
        date >= startDate &&
        date <= endDate &&
        transaction.category_id === categoryId
      );
    })
    .map(transaction => transaction.customer_id);

  return Array.from(new Set(customers)).length;
};

// Get quarterly transactions for a specific office
export const getQuarterlyTransactions = (data, officeId, quarter) => {
  const result = { count: 0, volume: 0 };

  // Determine the start and end months for the given quarter
  const startMonth = (quarter - 1) * 3 + 1;
  const endMonth = startMonth + 2;

  // Iterate over transactions to filter and aggregate data for the specified quarter and office
  data.transactions.forEach(transaction => {
    const date = new Date(transaction.date_of_transaction);
    const month = date.getMonth() + 1; // getMonth() is zero-based
    // console.log('mondsa',month);
    if (
      transaction.office_id == officeId &&
      month >= startMonth &&
      month <= endMonth
    ) {
        console.log("asd");
      result.count++;
      result.volume += transaction.amount;
    }
  });

  return result;
};

// Get national vs international transactions
// export const getNationalVsInternational = (data) => {
//   const result = { national: 0, international: 0 };
//   data.customers.forEach(customer => {
//     const transactions = data.transactions.filter(
//       transaction => transaction.customer_id === customer.id
//     );
//     transactions.forEach(transaction => {
//       if (customer.type === 'national') {
//         result.national += transaction.amount;
//       } else {
//         result.international += transaction.amount;
//       }
//     });
//   });
//   return result;
// };

export const getNationalVsInternational = (data) => {
    const result = { national: 0, international: 0, nationalData: [], internationalData: [] };

    data.customers.forEach(customer => {
      const transactions = data.transactions.filter(
        transaction => transaction.customer_id === customer.id
      );
      transactions.forEach(transaction => {
        const date = new Date(transaction.date_of_transaction).toString(); // Convert Date to ISO string
        const dataPoint = { x: date, y: (transaction.amount.toString()) };

        if (customer.type === 'national') {
          result.national += transaction.amount;
          result.nationalData.push(dataPoint);
        } else {
          result.international += transaction.amount;
          result.internationalData.push(dataPoint);
        }
      });
    });
    return result;
};


// Get max monthly transactions by category between given months
export const getMaxMonthlyTransactionsByCategory = (data, startMonth, endMonth) => {
  const maxTransactionsByCategoryArray = [];

  for (let categoryId = 1; categoryId <= 4; categoryId++) {
    const customers = {};

    for (let month = startMonth; month <= endMonth; month++) {
      const startDate = new Date(`2024-${month}-01`);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(endDate.getDate() - 1);

      const transactions = data.transactions.filter(transaction => {
        const date = new Date(transaction.date_of_transaction);
        return (
          date >= startDate &&
          date <= endDate &&
          transaction.category_id === categoryId
        );
      });

      transactions.forEach(transaction => {
        if (!customers[transaction.customer_id]) {
          customers[transaction.customer_id] = {
            count: 0,
            totalAmount: 0,
          };
        }
        customers[transaction.customer_id].count++;
        customers[transaction.customer_id].totalAmount += transaction.amount;
      });
    }

    const maxTransactions = Math.max(
      ...Object.values(customers).map(customer => customer.count)
    );

    const customerIds = Object.keys(customers).filter(
      id => customers[id].count === maxTransactions
    );

    const customerDetails = customerIds.map(id => {
      const customer = getCustomerDetailsById(data, id);
      return {
        id: customer.id,
        name: customer.name,
        company_name: customer.company_name,
        totalTransactions: customers[id].count,
        totalRevenue: customers[id].totalAmount,
      };
    });

    maxTransactionsByCategoryArray.push({
      categoryId: categoryId,
      maxTransactions: maxTransactions,
      customers: customerDetails,
    });
  }

  return maxTransactionsByCategoryArray;
};
