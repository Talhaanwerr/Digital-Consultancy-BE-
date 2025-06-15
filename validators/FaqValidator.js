const BaseValidator = require('./BaseValidator.js');

class FaqValidator extends BaseValidator {
  constructor() {
    super();
  }

  validationError(message) {
    return {
      status: false,
      message,
    };
  }

  validationSuccess(data) {
    return {
      status: true,
      data,
    };
  }

  validateFaq(data) {
    // Required fields
    if (!data.question || !data.question.trim()) {
      return this.validationError('Question is required');
    }

    if (!data.answer || !data.answer.trim()) {
      return this.validationError('Answer is required');
    }

    // Validate question length
    if (data.question.length > 500) {
      return this.validationError('Question cannot exceed 500 characters');
    }


    // Validate displayOrder if provided
    if (data.displayOrder !== undefined && isNaN(Number(data.displayOrder))) {
      return this.validationError('Display order must be a number');
    }

    return this.validationSuccess({
      question: data.question.trim(),
      answer: data.answer.trim(),
      displayOrder: data.displayOrder !== undefined ? Number(data.displayOrder) : 0,
    });
  }
}

module.exports = new FaqValidator(); 