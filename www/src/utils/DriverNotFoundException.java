package utils;

/**
 * Created by Drake on 2015/3/14.
 */
public final class DriverNotFoundException extends Exception {
    private Drivers exceptionDriver;

    public Drivers getExceptionDriver() {
        return exceptionDriver;
    }

    public DriverNotFoundException(Drivers driver, String message) {
        super(message);
        this.exceptionDriver = driver;
    }
}
