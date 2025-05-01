CREATE OR REPLACE PROCEDURE STATUS_SHIP_SP (
    p_basketid IN NUMBER,
    p_date IN DATE,
    p_shipper IN VARCHAR2,
    p_shipnum IN VARCHAR2
)
IS
BEGIN
    INSERT INTO bb_basketstatus (
        idstatus, idbasket, idstage, dtstage, shipper, shippingnum
    )
    VALUES (
        bb_status_seq.NEXTVAL, p_basketid, 3, p_date, p_shipper, p_shipnum
    );
    COMMIT;
END STATUS_SHIP_SP;
/