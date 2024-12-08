export const getFeedbacksFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('feedbacks') || '[]');
  } catch (error) {
    console.error('Error reading feedbacks from storage:', error);
    return [];
  }
};

export const saveFeedbacksToStorage = (feedbacks) => {
  try {
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
  } catch (error) {
    console.error('Error saving feedbacks to storage:', error);
  }
};