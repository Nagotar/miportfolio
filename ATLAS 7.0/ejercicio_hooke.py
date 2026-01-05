#!/usr/bin/env python3
# -*- coding: utf-8 -*-

def calcular_fuerza_hooke(k, distancia, c, velocidad, archivo_salida="resultados_F.txt"):
    """
    Calcula la fuerza según la ley de Hooke para resortes con amortiguamiento.
    
    Fórmula: F = k × distancia + c × velocidad
    
    Parámetros:
    - k: constante del resorte (10-1000, valor por defecto: 200)
    - distancia: distancia del resorte
    - c: constante de amortiguamiento (1-100, valor por defecto: 30)
    - velocidad: velocidad del sistema
    - archivo_salida: nombre del archivo donde guardar los resultados
    
    Retorna:
    - F: fuerza calculada, o -0 si los parámetros están fuera de rango
    """
    
    # Validar parámetros k y c
    if not (10 <= k <= 1000):
        print(f"❌ Error: k={k} está fuera del rango permitido (10-1000)")
        print(f"   La función devuelve: -0")
        return -0
    
    if not (1 <= c <= 100):
        print(f"❌ Error: c={c} está fuera del rango permitido (1-100)")
        print(f"   La función devuelve: -0")
        return -0
    
    # Los valores por defecto para distancia y velocidad son cero
    if distancia is None:
        distancia = 0
    if velocidad is None:
        velocidad = 0
    
    # Calcular la fuerza
    F = k * distancia + c * velocidad
    
    # Mostrar cálculo detallado en pantalla
    print(f"📊 Cálculo de Fuerza:")
    print(f"   F = k × distancia + c × velocidad")
    print(f"   F = {k} × {distancia} + {c} × {velocidad}")
    print(f"   F = {k * distancia} + {c * velocidad}")
    print(f"   F = {F}")
    print(f"✅ Resultado: F = {F}")
    
    # Escribir resultado al archivo
    try:
        with open(archivo_salida, 'a', encoding='utf-8') as archivo:
            archivo.write(f"k={k}, distancia={distancia}, c={c}, velocidad={velocidad} -> F={F}\n")
        print(f"💾 Resultado guardado en {archivo_salida}")
    except Exception as e:
        print(f"⚠️  Error al escribir en archivo: {e}")
    
    return F


def main():
    """
    Función principal que demuestra el uso de la función con diferentes parámetros
    """
    print("=== Ejercicio de Desarrollo: Ley de Hooke con Amortiguamiento ===")
    print("Fórmula: F = k × distancia + c × velocidad")
    print("Rangos válidos: k (10-1000), c (1-100)")
    print("Valores por defecto: k=200, c=30, distancia=0, velocidad=0")
    print()
    
    # Limpiar archivo de resultados al inicio
    with open("resultados_F.txt", 'w', encoding='utf-8') as archivo:
        archivo.write("=== Resultados del Cálculo de Fuerza (Ley de Hooke) ===\n")
    
    # Ejemplos de llamadas con diferentes combinaciones de parámetros
    ejemplos = [
        # Casos válidos
        {"k": 200, "distancia": 5, "c": 30, "velocidad": 2, "descripcion": "Valores normales"},
        {"k": 500, "distancia": 10, "c": 50, "velocidad": 0, "descripcion": "Solo fuerza elástica"},
        {"k": 100, "distancia": 0, "c": 80, "velocidad": 15, "descripcion": "Solo amortiguamiento"},
        {"k": 1000, "distancia": 3, "c": 1, "velocidad": 20, "descripcion": "k máximo, c mínimo"},
        {"k": 10, "distancia": 8, "c": 100, "velocidad": 5, "descripcion": "k mínimo, c máximo"},
        
        # Casos con valores por defecto (cero)
        {"k": 250, "distancia": None, "c": 40, "velocidad": None, "descripcion": "Distancia y velocidad por defecto"},
        
        # Casos fuera de rango
        {"k": 5, "distancia": 2, "c": 30, "velocidad": 1, "descripcion": "k fuera de rango (muy bajo)"},
        {"k": 1500, "distancia": 2, "c": 30, "velocidad": 1, "descripcion": "k fuera de rango (muy alto)"},
        {"k": 200, "distancia": 2, "c": 0, "velocidad": 1, "descripcion": "c fuera de rango (muy bajo)"},
        {"k": 200, "distancia": 2, "c": 150, "velocidad": 1, "descripcion": "c fuera de rango (muy alto)"},
    ]
    
    print("Ejecutando ejemplos:")
    print("-" * 60)
    
    for i, ejemplo in enumerate(ejemplos, 1):
        print(f"\nEjemplo {i}: {ejemplo['descripcion']}")
        print(f"Parámetros: k={ejemplo['k']}, distancia={ejemplo['distancia']}, c={ejemplo['c']}, velocidad={ejemplo['velocidad']}")
        
        resultado = calcular_fuerza_hooke(
            k=ejemplo['k'],
            distancia=ejemplo['distancia'],
            c=ejemplo['c'],
            velocidad=ejemplo['velocidad']
        )
        
        if resultado == -0:
            print("❌ Parámetros fuera de rango - Función devolvió -0")
        else:
            print(f"✅ Fuerza calculada: F = {resultado}")
    
    print("\n" + "="*60)
    print("Todos los resultados han sido guardados en 'resultados_F.txt'")
    print("Revisa el archivo para ver el historial completo de cálculos.")


if __name__ == "__main__":
    main()
