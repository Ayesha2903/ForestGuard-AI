from fastapi import FastAPI
from pydantic import BaseModel
from app.database import get_connection


class ZoneCreate(BaseModel):
    zone_code: str
    name: str
    area_hectares: float | None = None
    latitude: float | None = None
    longitude: float | None = None
    boundary: str | None = None
    status: str = "HEALTHY"

app = FastAPI(
    title="ForestGuard AI API",
    description="Backend API for the ForestGuard AI forest monitoring system",
    version="1.0.0",
)


@app.get("/")
def root():
    return {
        "message": "ForestGuard AI API is running",
        "version": "1.0.0",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
    }


@app.get("/db-test")
def db_test():
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1;")
            result = cursor.fetchone()

    return {
        "database": "connected",
        "result": result[0],
    }

@app.get("/zones")
def get_zones():
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT
                    zone_id,
                    zone_code,
                    name,
                    area_hectares,
                    latitude,
                    longitude,
                    boundary,
                    status,
                    created_at
                FROM zones
                ORDER BY zone_id;
            """)

            zones = cursor.fetchall()

    return {
        "zones": [
            {
                "zone_id": zone[0],
                "zone_code": zone[1],
                "name": zone[2],
                "area_hectares": zone[3],
                "latitude": zone[4],
                "longitude": zone[5],
                "boundary": zone[6],
                "status": zone[7],
                "created_at": zone[8],
            }
            for zone in zones
        ]
    }


@app.post("/zones")
def create_zone(zone: ZoneCreate):
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO zones (
                    zone_code,
                    name,
                    area_hectares,
                    latitude,
                    longitude,
                    boundary,
                    status
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                RETURNING zone_id;
            """, (
                zone.zone_code,
                zone.name,
                zone.area_hectares,
                zone.latitude,
                zone.longitude,
                zone.boundary,
                zone.status,
            ))

            zone_id = cursor.fetchone()[0]
            connection.commit()

    return {
        "message": "Zone created successfully",
        "zone_id": zone_id,
    }
