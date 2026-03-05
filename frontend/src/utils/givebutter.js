// Givebutter integration helper
// This opens the Givebutter donation widget

export const openGivebutterWidget = () => {
  // Check if Givebutter is loaded
  if (typeof window.Givebutter !== 'undefined') {
    window.Givebutter('open');
  } else {
    // Fallback to campaign URL if widget not loaded
    window.open('https://givebutter.com/All4Vets-Fundraising-Campaign', '_blank');
  }
};

// Alternative: Direct link to campaign
export const GIVEBUTTER_CAMPAIGN_URL = 'https://givebutter.com/All4Vets-Fundraising-Campaign';
