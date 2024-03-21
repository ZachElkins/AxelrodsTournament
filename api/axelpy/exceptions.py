class MessageException(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(message)


class CodeException(MessageException):
    def __init__(self, message):
        super().__init__(f'CodeException: ${message}')


class TypeException(MessageException):
    def __init__(self, message):
        super().__init__(f'TypeException: ${message}')
