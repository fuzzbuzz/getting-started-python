from bs4 import BeautifulSoup

def fuzz_bshtml(html_doc):
    soup = BeautifulSoup(html_doc, 'html.parser')
