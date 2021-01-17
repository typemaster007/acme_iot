FROM python:3.8.1
WORKDIR /project
ADD . /project
RUN pip install -r requirements.txt
ENTRYPOINT [ "flask" ]
CMD ["run", "--host=0.0.0.0", "--port=5000"]

