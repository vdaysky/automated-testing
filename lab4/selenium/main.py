import math
import time
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()

try:
    driver.get("https://suninjuly.github.io/math.html")

    x_element = driver.find_element(By.ID, "input_value")
    x = int(x_element.text)

    result = math.log(abs(12 * math.sin(x)))

    answer_input = driver.find_element(By.ID, "answer")
    answer_input.send_keys(str(result))

    robot_checkbox = driver.find_element(By.ID, "robotCheckbox")
    robot_checkbox.click()

    robots_rule_radio = driver.find_element(By.ID, "robotsRule")
    robots_rule_radio.click()

    submit_button = driver.find_element(By.CSS_SELECTOR, "button.btn")
    submit_button.click()

    time.sleep(5)

finally:
    # Close the browser
    driver.quit()
