export async function getUserAnalytics() {
  // Later this will come from DB queries
  return {
    activeUsers: 128,
    suspendedUsers: 7,

    newUsersWeekly: [12, 18, 25, 31],

    topActiveUsers: [
      { name: "Ibrahim Musa", actions: 120 },
      { name: "Aisha Bello", actions: 98 },
      { name: "Daniel Okoye", actions: 85 },
      { name: "Zainab Lawal", actions: 73 },
    ],
  };
}
