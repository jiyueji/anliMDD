import cherrypy

from run import *


def main():

    # Mount the application
    cherrypy.tree.graft(app.wsgi_app, "/")

    # Unsubscribe the default server
    cherrypy.server.unsubscribe()

    # Instantiate a new server object
    server = cherrypy._cpserver.Server()

    # Configure the server object
    server.socket_host = "0.0.0.0"
    server.socket_port = 5000
    server.thread_pool = 30

    # For SSL Support
    # server.ssl_module        = 'pyopenssl'
    # server.ssl_certificate     = 'ssl/cert.pem'
    # server.ssl_private_key     = 'ssl/key.pem'
    # server.ssl_certificate_chain = 'cert.pem'

    # Subscribe this server
    server.subscribe()

    # Start the server engine (Option 1 *and* 2)
    cherrypy.engine.start()
    cherrypy.engine.block()

if __name__ == '__main__':
    main()

