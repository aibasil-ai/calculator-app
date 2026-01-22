"""
Unit tests for calculator module.
"""

import unittest
import pytest
from calculator import add, subtract, multiply, divide


class TestCalculator(unittest.TestCase):
    """Test cases for calculator functions."""

    def test_add_positive_numbers(self):
        """Test addition of positive numbers."""
        self.assertEqual(add(2, 3), 5)
        self.assertEqual(add(10, 20), 30)

    def test_add_negative_numbers(self):
        """Test addition with negative numbers."""
        self.assertEqual(add(-5, -3), -8)
        self.assertEqual(add(-10, 5), -5)

    def test_add_zero(self):
        """Test addition with zero."""
        self.assertEqual(add(0, 5), 5)
        self.assertEqual(add(5, 0), 5)

    def test_add_floats(self):
        """Test addition with floating point numbers."""
        self.assertAlmostEqual(add(2.5, 3.7), 6.2)
        self.assertAlmostEqual(add(0.1, 0.2), 0.3)

    def test_subtract_positive_numbers(self):
        """Test subtraction of positive numbers."""
        self.assertEqual(subtract(10, 3), 7)
        self.assertEqual(subtract(20, 5), 15)

    def test_subtract_negative_numbers(self):
        """Test subtraction with negative numbers."""
        self.assertEqual(subtract(-5, -3), -2)
        self.assertEqual(subtract(10, -5), 15)

    def test_subtract_zero(self):
        """Test subtraction with zero."""
        self.assertEqual(subtract(5, 0), 5)
        self.assertEqual(subtract(0, 5), -5)

    def test_subtract_floats(self):
        """Test subtraction with floating point numbers."""
        self.assertAlmostEqual(subtract(5.5, 2.3), 3.2)

    def test_multiply_positive_numbers(self):
        """Test multiplication of positive numbers."""
        self.assertEqual(multiply(3, 4), 12)
        self.assertEqual(multiply(5, 6), 30)

    def test_multiply_negative_numbers(self):
        """Test multiplication with negative numbers."""
        self.assertEqual(multiply(-3, 4), -12)
        self.assertEqual(multiply(-3, -4), 12)

    def test_multiply_zero(self):
        """Test multiplication with zero."""
        self.assertEqual(multiply(5, 0), 0)
        self.assertEqual(multiply(0, 5), 0)

    def test_multiply_floats(self):
        """Test multiplication with floating point numbers."""
        self.assertAlmostEqual(multiply(2.5, 4), 10.0)
        self.assertAlmostEqual(multiply(0.5, 0.5), 0.25)

    def test_divide_positive_numbers(self):
        """Test division of positive numbers."""
        self.assertEqual(divide(10, 2), 5)
        self.assertEqual(divide(15, 3), 5)

    def test_divide_negative_numbers(self):
        """Test division with negative numbers."""
        self.assertEqual(divide(-10, 2), -5)
        self.assertEqual(divide(-10, -2), 5)

    def test_divide_floats(self):
        """Test division with floating point numbers."""
        self.assertAlmostEqual(divide(7.5, 2.5), 3.0)
        self.assertAlmostEqual(divide(1, 3), 0.333333, places=5)

    def test_divide_by_zero(self):
        """Test division by zero raises ValueError."""
        with self.assertRaises(ValueError) as context:
            divide(10, 0)
        self.assertEqual(str(context.exception), "Cannot divide by zero")

    def test_divide_zero_by_number(self):
        """Test zero divided by a number."""
        self.assertEqual(divide(0, 5), 0)


# Pytest tests
def test_add_basic():
    """Pytest: Test basic addition."""
    assert add(1, 1) == 2


def test_subtract_basic():
    """Pytest: Test basic subtraction."""
    assert subtract(5, 3) == 2


def test_multiply_basic():
    """Pytest: Test basic multiplication."""
    assert multiply(3, 3) == 9


def test_divide_basic():
    """Pytest: Test basic division."""
    assert divide(10, 2) == 5


def test_divide_by_zero_pytest():
    """Pytest: Test division by zero."""
    with pytest.raises(ValueError, match="Cannot divide by zero"):
        divide(5, 0)


if __name__ == '__main__':
    unittest.main()
