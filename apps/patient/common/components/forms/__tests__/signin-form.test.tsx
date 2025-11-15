/**
 * TEST FILE: SigninForm Component Tests
 * 
 * This file contains comprehensive tests for the SigninForm component.
 * It tests form rendering, user interactions, validation, and form submission.
 * 
 * Testing Tools Used:
 * - Vitest: Test runner and assertion library
 * - React Testing Library: Utilities for testing React components
 * - User Event: Simulates real user interactions (typing, clicking, etc.)
 */

// Import testing utilities from Vitest
// - describe: Groups related tests together
// - it: Defines a single test case
// - expect: Makes assertions about values
// - vi: Vitest's mocking utilities
// - beforeEach: Runs before each test (useful for setup/cleanup)
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Import React Testing Library utilities
// - render: Renders a React component into a virtual DOM for testing
// - screen: Provides queries to find elements in the rendered component
// - waitFor: Waits for async operations to complete (like validation messages appearing)
import { render, screen, waitFor } from '@testing-library/react'

// Import user-event to simulate real user interactions
// This is better than directly firing events because it mimics actual user behavior
import userEvent from '@testing-library/user-event'
import SigninForm from '../signin-form'
// Import the component we're testing

/**
 * Mock console.log to prevent test output from being cluttered
 * We spy on console.log to verify that form submission calls it with the correct data
 * mockImplementation(() => {}) replaces the function with an empty one
 */
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

/**
 * Test Suite: SigninForm
 * All tests related to the SigninForm component are grouped here
 */
describe('SigninForm', () => {
  /**
   * beforeEach runs before each test case
   * We clear the console.log spy to ensure each test starts with a clean state
   * This prevents tests from interfering with each other
   */
  beforeEach(() => {
    consoleSpy.mockClear()
  })

  /**
   * Test: Basic Form Rendering
   * 
   * Purpose: Verify that all essential form elements are rendered on the page
   * This is a fundamental test - if this fails, nothing else will work
   * 
   * What we're checking:
   * - Email input field exists (found by its label)
   * - Password input field exists (found by its label)
   * - Submit button exists (found by its role and accessible name)
   */
  it('renders the form with all required fields', () => {
    // Render the component into the test environment
    render(<SigninForm />)

    // Check if email input is present
    // getByLabelText finds elements by their associated label text
    // The /email/i is a case-insensitive regex pattern
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()

    // Check if password input is present
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()

    // Check if login button is present
    // getByRole finds elements by their ARIA role (button, link, etc.)
    // We also specify the accessible name to find the specific button
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  /**
   * Test: Email Input Attributes
   * 
   * Purpose: Verify the email input has the correct placeholder and type attribute
   * This ensures the input is properly configured for user interaction
   */
  it('renders email input with correct placeholder', () => {
    render(<SigninForm />)

    // Find the input by its placeholder text
    const emailInput = screen.getByPlaceholderText(/enter your email/i)
    
    // Verify it exists in the DOM
    expect(emailInput).toBeInTheDocument()
    
    // Verify it has the correct input type (text for email)
    // This ensures proper browser behavior and accessibility
    expect(emailInput).toHaveAttribute('type', 'text')
  })

  /**
   * Test: Password Input Attributes
   * 
   * Purpose: Verify the password input has correct placeholder and type="password"
   * The type="password" is crucial for security - it hides the input from view
   */
  it('renders password input with correct placeholder', () => {
    render(<SigninForm />)

    // Find the password input by its placeholder
    const passwordInput = screen.getByPlaceholderText(/enter your password/i)
    
    // Verify it exists
    expect(passwordInput).toBeInTheDocument()
    
    // Verify it has type="password" to hide the input for security
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  /**
   * Test: Signup Link
   * 
   * Purpose: Verify the "Signup" link exists and points to the correct route
   * This ensures users can navigate to the signup page
   */
  it('renders signup link', () => {
    render(<SigninForm />)

    // Find the link by its role and accessible name
    const signupLink = screen.getByRole('link', { name: /signup/i })
    
    // Verify the link exists
    expect(signupLink).toBeInTheDocument()
    
    // Verify it has the correct href attribute
    // This ensures navigation works correctly
    expect(signupLink).toHaveAttribute('href', '/signup')
  })

  /**
   * Test: Email Input Interaction
   * 
   * Purpose: Verify users can type into the email input field
   * This tests the basic interactivity of the form
   * 
   * Note: userEvent.type() simulates real typing, including events like focus, keydown, etc.
   */
  it('allows user to type in email field', async () => {
    // Setup user-event (required for async operations)
    const user = userEvent.setup()
    
    // Render the component
    render(<SigninForm />)

    // Find the email input field
    const emailInput = screen.getByLabelText(/email/i)
    
    // Simulate user typing into the field
    // The 'await' is important - user interactions are async
    await user.type(emailInput, 'test@example.com')

    // Verify the input now contains the typed value
    expect(emailInput).toHaveValue('test@example.com')
  })

  /**
   * Test: Password Input Interaction
   * 
   * Purpose: Verify users can type into the password input field
   * Similar to email test, but for the password field
   */
  it('allows user to type in password field', async () => {
    const user = userEvent.setup()
    render(<SigninForm />)

    // Find the password input
    const passwordInput = screen.getByLabelText(/password/i)
    
    // Simulate typing a password
    await user.type(passwordInput, 'password123')

    // Verify the value was entered (even though it's hidden)
    expect(passwordInput).toHaveValue('password123')
  })

  /**
   * Test: Email Validation - Invalid Format
   * 
   * Purpose: Verify the form shows an error when email format is invalid
   * This tests the Zod validation schema (email validation)
   * 
   * Test Flow:
   * 1. User types invalid email
   * 2. User clicks submit
   * 3. Form validation runs
   * 4. Error message appears
   */
  it('shows validation error when email is invalid', async () => {
    const user = userEvent.setup()
    render(<SigninForm />)

    // Get references to form elements
    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    // Simulate user entering invalid email and submitting
    await user.type(emailInput, 'invalid-email')
    await user.click(submitButton)

    // Wait for validation error to appear
    // waitFor is needed because validation happens asynchronously
    // It will retry the assertion until it passes or times out
    await waitFor(() => {
      // Check that the error message is displayed
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument()
    })
  })

  /**
   * Test: Password Validation - Minimum Length
   * 
   * Purpose: Verify the form shows an error when password is less than 9 characters
   * This tests the Zod validation schema (min length validation)
   */
  it('shows validation error when password is too short', async () => {
    const user = userEvent.setup()
    render(<SigninForm />)

    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    // Type a password that's too short (less than 9 characters)
    await user.type(passwordInput, 'short')
    await user.click(submitButton)

    // Wait for and verify the validation error appears
    await waitFor(() => {
      expect(
        screen.getByText(/password must be at least 9 characters/i)
      ).toBeInTheDocument()
    })
  })

  /**
   * Test: Email Validation - Empty Field
   * 
   * Purpose: Verify the form validates required fields
   * Users should not be able to submit without filling required fields
   */
  it('shows validation error when email is empty', async () => {
    const user = userEvent.setup()
    render(<SigninForm />)

    // Try to submit without entering any data
    const submitButton = screen.getByRole('button', { name: /login/i })
    await user.click(submitButton)

    // Verify validation error appears for empty email
    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument()
    })
  })

  /**
   * Test: Password Validation - Empty Field
   * 
   * Purpose: Verify password is required even if email is valid
   * This ensures all required fields are validated
   */
  it('shows validation error when password is empty', async () => {
    const user = userEvent.setup()
    render(<SigninForm />)

    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    // Enter valid email but leave password empty
    await user.type(emailInput, 'test@example.com')
    await user.click(submitButton)

    // Verify password validation error appears
    await waitFor(() => {
      expect(
        screen.getByText(/password must be at least 9 characters/i)
      ).toBeInTheDocument()
    })
  })

  /**
   * Test: Successful Form Submission
   * 
   * Purpose: Verify the form submits correctly when all validation passes
   * This is the "happy path" test - everything works as expected
   * 
   * How we verify submission:
   * - The form's onSubmit function calls console.log with the form data
   * - We spy on console.log to verify it was called with the correct data
   * - In a real app, you'd mock an API call instead
   */
  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    render(<SigninForm />)

    // Get all form elements
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    // Fill in valid data
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    
    // Submit the form
    await user.click(submitButton)

    // Verify the form's onSubmit was called with the correct data
    // waitFor ensures we wait for any async operations to complete
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
    })
  })

  /**
   * Test: Form Does Not Submit on Validation Failure
   * 
   * Purpose: Verify the form prevents submission when validation fails
   * This is a critical security/UX test - invalid data should never be submitted
   * 
   * What we're checking:
   * 1. Validation error appears (form caught the error)
   * 2. onSubmit was NOT called (form didn't submit)
   */
  it('does not submit form when validation fails', async () => {
    const user = userEvent.setup()
    render(<SigninForm />)

    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    // Enter invalid data and try to submit
    await user.type(emailInput, 'invalid-email')
    await user.click(submitButton)

    // Verify validation error appears
    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument()
    })

    // Verify the form did NOT submit
    // expect.objectContaining allows partial matching of objects
    // This checks that console.log was NOT called with any form data object
    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.objectContaining({
        email: expect.any(String),
        password: expect.any(String),
      })
    )
  })

  /**
   * Test: Dynamic Validation Error Clearing
   * 
   * Purpose: Verify validation errors disappear when user fixes their input
   * This tests real-time validation feedback - good UX practice
   * 
   * Test Flow:
   * 1. User enters invalid data → error appears
   * 2. User fixes the data → error disappears
   * 
   * Note: queryByText returns null if not found (doesn't throw error)
   *       getByText throws an error if not found
   *       We use queryByText when checking for absence
   */
  it('clears validation errors when user corrects input', async () => {
    const user = userEvent.setup()
    render(<SigninForm />)

    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    // Step 1: Trigger validation error by entering invalid email and submitting
    await user.type(emailInput, 'invalid')
    await user.click(submitButton)

    // Verify error message appears
    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument()
    })

    // Step 2: Fix the input by clearing and entering valid email
    await user.clear(emailInput)
    await user.type(emailInput, 'valid@example.com')

    // Step 3: Verify error message disappears
    // queryByText is used here because we're checking for absence
    // It returns null if not found, which is what we want
    await waitFor(() => {
      expect(
        screen.queryByText(/invalid email address/i)
      ).not.toBeInTheDocument()
    })
  })

  /**
   * Test: Multiple Field Validation
   * 
   * Purpose: Verify the form validates ALL fields when submitted empty
   * This ensures users see all validation errors at once, not one at a time
   * 
   * Why this matters:
   * - Better UX: Users see all issues immediately
   * - Prevents multiple submission attempts
   */
  it('validates both fields when submitting empty form', async () => {
    const user = userEvent.setup()
    render(<SigninForm />)

    // Try to submit without entering any data
    const submitButton = screen.getByRole('button', { name: /login/i })
    await user.click(submitButton)

    // Verify BOTH validation errors appear simultaneously
    await waitFor(() => {
      // Email validation error
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument()
      
      // Password validation error
      expect(
        screen.getByText(/password must be at least 9 characters/i)
      ).toBeInTheDocument()
    })
  })
})

