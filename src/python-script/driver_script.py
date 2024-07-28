from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

print("enter q to quit")
chrome_options = Options()
chrome_options.add_argument("--headless")
driver = webdriver.Chrome(options = chrome_options)
while True:
    #driver.get("https://cats.com")
    channel_name = input("enter channel name: ")
    if channel_name == 'q':
        break
    channel_search_page =  "https://www.youtube.com/results?search_query=" + channel_name
    try:
        driver.get(channel_search_page)
        element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "main-link"))
            )
        if element:
            driver.execute_script("arguments[0].scrollIntoView();", element)
            element.click()
            url = driver.current_url
            print(url)
            print("=================")
        else:
            print("no channel found, try another name")
    except TimeoutException:
         print("no channel found, try another name")
driver.quit()
