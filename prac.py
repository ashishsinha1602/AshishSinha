import docx2txt
def extract_text_from_doc(doc_path):
    temp = docx2txt.process("C:/Users/deepa/Desktop/Ashish_CV_1.doc")
    text = [line.replace('\t', ' ') for line in temp.split('\n') if line]
    return ' '.join(text)