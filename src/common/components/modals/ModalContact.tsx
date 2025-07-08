// ContactModal.tsx
import React, { useEffect, useState } from 'react';
import {
  Modal, View, TextInput, Button, StyleSheet, TouchableOpacity,
  Platform, KeyboardAvoidingView, Switch, Alert, Text
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Contact } from '../../../features/contactos/domain/entities/contact';

interface Props {
  visible: boolean;
  contactToEdit?: Contact | null;
  onClose: () => void;
  onSubmit: (contact: Contact) => void;
}

export default function ContactModal({ visible, contactToEdit, onClose, onSubmit }: Props) {
  const [form, setForm] = useState<Contact>({
    id: '',
    name: '',
    firstName: '',
    lastName: '',
    imageUri: '',
    contactType: 'person',
    isFavorite: false,
    lookupKey: '',
    priority: 'ninguna',
    phoneNumbers: [],
    emails: [],
  });

  useEffect(() => {
    if (visible && contactToEdit) {
      setForm(contactToEdit);
    } else if (visible) {
      resetForm();
    }
  }, [visible, contactToEdit]);

  const resetForm = () => {
    setForm({
      id: '',
      name: '',
      firstName: '',
      lastName: '',
      imageUri: '',
      contactType: 'person',
      isFavorite: false,
      lookupKey: '',
      priority: 'ninguna',
      phoneNumbers: [],
      emails: [],
    });
  };

  // Cuando se actualiza firstName o lastName, actualiza automáticamente name
  const handleFieldChange = (key: keyof Contact, value: any) => {
    const updatedForm = { ...form, [key]: value };

    if (key === 'firstName' || key === 'lastName') {
      updatedForm.name = `${key === 'firstName' ? value : form.firstName} ${key === 'lastName' ? value : form.lastName}`.trim();
    }

    setForm(updatedForm);
  };

  const handleSubmit = () => {
    if (!form.firstName.trim()) {
      Alert.alert('Nombre requerido', 'Por favor ingresa al menos un nombre');
      return;
    }

    onSubmit({ ...form, id: contactToEdit?.id ?? '' });
    resetForm();
    onClose();
  };

  const addPhone = () => {
    const updated = [...(form.phoneNumbers || []), { number: '', label: 'Móvil' }];
    setForm({ ...form, phoneNumbers: updated });
  };

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{contactToEdit ? 'Editar Contacto' : 'Nuevo Contacto'}</Text>

            {/*  Mostrar nombre completo generado */}
            <Text style={styles.label}>Nombre completo</Text>
            <Text style={[styles.input, { backgroundColor: '#EEE', color: '#666' }]}>
              {form.name || '—'}
            </Text>

            {/*  Primer nombre */}
            <Text style={styles.label}>Primer nombre</Text>
            <TextInput
              style={styles.input}
              value={form.firstName}
              onChangeText={text => handleFieldChange('firstName', text)}
              placeholder="Ej. Juan"
            />

            {/* 👪 Apellido */}
            <Text style={styles.label}>Apellido</Text>
            <TextInput
              style={styles.input}
              value={form.lastName}
              onChangeText={text => handleFieldChange('lastName', text)}
              placeholder="Ej. Pérez"
            />

            {/* Tipo de contacto */}
            <Text style={styles.label}>Tipo</Text>
            <View style={styles.row}>
              {['person', 'company'].map(type => (
                <TouchableOpacity
                  key={type}
                  style={[styles.chip, form.contactType === type && styles.selectedChip]}
                  onPress={() => handleFieldChange('contactType', type)}
                >
                  <Text style={styles.chipText}>{type === 'person' ? 'Persona' : 'Empresa'}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/*  Favorito */}
            <View style={styles.row}>
              <Text style={styles.label}>¿Favorito?</Text>
              <Switch
                value={form.isFavorite}
                onValueChange={val => handleFieldChange('isFavorite', val)}
              />
            </View>

            {/* Prioridad */}
            <Text style={styles.label}>Prioridad</Text>
            <View style={styles.priorityRow}>
              {['alta', 'media', 'baja', 'ninguna'].map(level => {
                const colorMap: Record<string, string> = {
                  alta: '#FF4D4D',
                  media: '#FFA500',
                  baja: '#4CAF50',
                  ninguna: '#BDBDBD',
                };

                const isSelected = form.priority === level;

                return (
                  <TouchableOpacity
                    key={level}
                    onPress={() => handleFieldChange('priority', level)}
                    style={[
                      styles.priorityChip,
                      { backgroundColor: colorMap[level] },
                      isSelected && styles.prioritySelected,
                    ]}
                  >
                    <Text style={styles.priorityText}>{level.toUpperCase()}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/*  Teléfonos */}
            <Text style={styles.label}>Teléfonos</Text>
            {form.phoneNumbers?.map((phone, index) => (
              <TextInput
                key={index}
                style={styles.input}
                placeholder="Número"
                value={phone.number}
                onChangeText={text => {
                  const updated = [...(form.phoneNumbers || [])];
                  updated[index].number = text;
                  handleFieldChange('phoneNumbers', updated);
                }}
              />
            ))}
            <Button title="Agregar Teléfono" onPress={addPhone} />

            {/* Botones */}
            <View style={styles.footer}>
              <Button title="Cancelar" onPress={onClose} color="#888" />
              <Button title="Guardar" onPress={handleSubmit} />
            </View>
          </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 14 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  label: { fontWeight: '600', color: '#444', marginTop: 10 },
  input: {
    borderWidth: 1, borderColor: '#DDD', paddingHorizontal: 12,
    paddingVertical: 8, borderRadius: 10, backgroundColor: '#FFF',
  },
  row: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 10, alignItems: 'center', marginVertical: 8,
  },
  chip: {
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20,
    backgroundColor: '#EEE',
  },
  selectedChip: {
    backgroundColor: '#007AFF',
  },
  chipText: {
    color: '#000',
  },
  footer: {
    marginTop: 30, flexDirection: 'row', justifyContent: 'space-between', gap: 20,
  },
  priorityRow: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 10,
  marginTop: 8,
},

priorityChip: {
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 20,
  opacity: 0.7,
},

prioritySelected: {
  borderWidth: 2,
  borderColor: '#000',
  opacity: 1,
},

priorityText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 13,
},
});